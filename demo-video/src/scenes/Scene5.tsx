import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	staticFile,
	OffthreadVideo,
	useVideoConfig,
	spring,
} from 'remotion';
import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

export const Scene5: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const text = "Think something's up? Give your Farmagotchi a check.";
	const textStart = 20;
	const framesPerChar = 1;
	const relativeFrame = Math.max(0, frame - textStart);
	const charsToShow = Math.floor(relativeFrame / framesPerChar);
	const displayedText = text.slice(0, charsToShow);
	const cursorBlink = Math.floor(frame / 15) % 2 === 0;

	const fadeOutStart = durationInFrames - 30;
	const sceneOpacity = interpolate(
		frame,
		[fadeOutStart, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const finishedTypingFrame = textStart + text.length * framesPerChar;
	const textHop = spring({
		frame: Math.max(0, frame - finishedTypingFrame),
		fps,
		config: {damping: 10, stiffness: 200},
	});
	const hopY = interpolate(textHop, [0, 0.5, 1], [0, -20, 0], {extrapolateRight: 'clamp'});

	const phoneSpring = spring({
		frame: Math.max(0, frame - finishedTypingFrame + 10),
		fps,
		config: {damping: 14, stiffness: 120},
	});

	const phoneTranslateY = interpolate(phoneSpring, [0, 1], [800, 0]);
	const phoneRotateX = interpolate(phoneSpring, [0, 1], [30, 0]);

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent'}}>
			<SubtleBackground />
			<div style={{
				width: '100%', 
				height: '100%', 
				opacity: sceneOpacity, 
				display: 'flex', 
				flexDirection: 'row', 
				alignItems: 'center', 
				justifyContent: 'space-between',
				padding: '0 100px',
				boxSizing: 'border-box'
			}}>
				
				<div
					style={{
						flex: 1,
						fontFamily,
						fontSize: 80,
						fontWeight: 'bold',
						color: '#333',
						textAlign: 'left',
						paddingRight: '60px',
						transform: `translateY(${hopY}px)`
					}}
				>
					{displayedText}
					<span style={{opacity: cursorBlink ? 1 : 0}}>|</span>
				</div>

				<div
					style={{
						width: 450,
						height: 900,
						borderRadius: 60,
						overflow: 'hidden',
						boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
						border: '14px solid #111',
						backgroundColor: '#000',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						flexShrink: 0,
						transform: `translateY(${phoneTranslateY}px) perspective(1000px) rotateX(${phoneRotateX}deg)`,
						opacity: interpolate(phoneSpring, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'}),
					}}
				>
					<OffthreadVideo
						src={staticFile('scan.mp4')}
						playbackRate={2.0}
            startFrom={120}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
						}}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};
