import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	staticFile,
	OffthreadVideo,
	Sequence,
	Easing,
	spring,
	useVideoConfig,
} from 'remotion';
import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

const VideoContainer: React.FC<{scale: number; translateY: number}> = ({scale, translateY}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	
	const videoSpring = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 100},
	});

	return (
		<div
			style={{
				width: 400,
				height: 800,
				borderRadius: 60,
				overflow: 'hidden',
				boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
				border: '10px solid #ccc',
				backgroundColor: '#ffffff',
				opacity: interpolate(videoSpring, [0, 1], [0, 1]),
				position: 'relative',
				transform: `scale(${scale}) translateY(${translateY}px) perspective(1000px) rotateX(${interpolate(videoSpring, [0, 1], [15, 0])}deg)`,
			}}
		>
			<OffthreadVideo
				src={staticFile('aiinsight.mp4')}
				startFrom={300}
				playbackRate={1.0}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			/>
		</div>
	);
};

export const Scene6: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const baseText = "Keep your crops ";
	const originalWord = "healthy.";
	const newWord = "happy.";
	
	let displayedText = "";
	
	if (frame < 100) {
		const fullString = baseText + originalWord;
		const charsToShow = Math.floor(frame / 2); // Faster typing
		displayedText = fullString.slice(0, charsToShow);
	} else if (frame >= 100 && frame < 120) {
		const charsToRemove = Math.floor((frame - 100) / 2.5);
		const currentWord = originalWord.slice(0, Math.max(0, originalWord.length - charsToRemove));
		displayedText = baseText + currentWord;
	} else {
		const charsToAdd = Math.floor((frame - 120) / 2);
		const currentWord = newWord.slice(0, Math.min(newWord.length, charsToAdd));
		displayedText = baseText + currentWord;
	}
	
	const textFadeStart = 150; 
	const textOpacity = interpolate(
		frame,
		[textFadeStart, textFadeStart + 20],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	// The "Happy" Flash Background Color
	const finishedHappyFrame = 120 + newWord.length * 2; // 132
	const flashOpacity = interpolate(
		frame,
		[finishedHappyFrame, finishedHappyFrame + 10, finishedHappyFrame + 30],
		[0, 0.5, 0], // Flash of color
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const phoneStartFrame = 180;
	const phoneScale = interpolate(
		frame,
		[phoneStartFrame + 60, phoneStartFrame + 85], // 25 frames, smooth ease
		[1, 2.7],
		{
			extrapolateLeft: 'clamp', 
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.65, 0, 0.35, 1), // ease-in-out
		}
	);

	const phoneTranslateY = interpolate(
		frame,
		[phoneStartFrame + 120, phoneStartFrame + 400],
		[0, -400], 
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const sceneOpacity = interpolate(
		frame,
		[durationInFrames - 30, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
			<SubtleBackground />
			{/* Color flash overlay */}
			<AbsoluteFill style={{backgroundColor: '#D0F0A0', opacity: flashOpacity, zIndex: -1}} />

			<div style={{width: '100%', height: '100%', opacity: sceneOpacity, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				
				{frame < phoneStartFrame && (
					<div
						style={{
							fontFamily,
							fontSize: 80,
							fontWeight: 'bold',
							color: '#333',
							textAlign: 'center',
							opacity: textOpacity,
							width: '100%',
							position: 'absolute',
							top: '50%',
							transform: 'translateY(-50%)',
							zIndex: 10,
						}}
					>
						{displayedText}
					</div>
				)}

				<Sequence from={phoneStartFrame} layout="none">
					<VideoContainer scale={phoneScale} translateY={phoneTranslateY}/>
				</Sequence>
			</div>
		</AbsoluteFill>
	);
};
