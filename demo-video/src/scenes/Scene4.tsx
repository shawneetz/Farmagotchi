import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	staticFile,
	OffthreadVideo,
	useVideoConfig,
	Easing,
	spring,
} from 'remotion';
import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

export const Scene4: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const text = 'Track your expenses.';
	const words = text.split(' ');

	const textInStartFrame = 20;
	const textOutStartFrame = 100; 

	const fadeOutStart = durationInFrames - 30;
	const sceneOpacity = interpolate(
		frame,
		[fadeOutStart, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const videoSpring = spring({
		frame: Math.max(0, frame - 30),
		fps,
		config: {damping: 14, stiffness: 100},
	});

	const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);

	const zoomScale = interpolate(
		frame,
		[100, 140, 260, 300, 580, 640],
		[1, 3.2, 3.2, 3.2, 3.2, 1.2],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeInOutCubic,
		}
	);

	const zoomTranslateX = interpolate(
		frame,
		[100, 140, 260, 300, 580, 640],
		[0, -90, -90, -90, -90, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeInOutCubic,
		}
	);

	const zoomTranslateY = interpolate(
		frame,
		[100, 140, 160, 300, 580, 640],
		[0, 380, 380, 180, 180, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeInOutCubic,
		}
	);

	const microFloat = Math.sin(frame / 20) * 5;

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
			<SubtleBackground />
			<div style={{width: '100%', height: '100%', opacity: sceneOpacity, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
				
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: '0.4em',
						fontFamily,
						fontSize: 80,
						fontWeight: 'bold',
						color: '#333',
						textAlign: 'center',
						position: 'absolute',
						top: 60,
						zIndex: 10,
						width: '80%',
					}}
				>
					{words.map((word, i) => {
						const delayIn = i * 4;
						const delayOut = i * 4;

						const wordSpringIn = spring({
							frame: Math.max(0, frame - textInStartFrame - delayIn),
							fps,
							config: {damping: 14, stiffness: 150},
						});

						const wordSpringOut = spring({
							frame: Math.max(0, frame - textOutStartFrame - delayOut),
							fps,
							config: {damping: 14, stiffness: 150},
						});

						const blurIn = interpolate(wordSpringIn, [0, 1], [5, 0]);
						const blurOut = interpolate(wordSpringOut, [0, 1], [0, 5]);

						const opacity = frame < textOutStartFrame ? wordSpringIn : 1 - wordSpringOut;
						const translateX = frame < textOutStartFrame 
							? interpolate(wordSpringIn, [0, 1], [40, 0]) 
							: interpolate(wordSpringOut, [0, 1], [0, -400]);
						
						const blur = frame < textOutStartFrame ? blurIn : blurOut;

						return (
							<span
								key={i}
								style={{
									opacity,
									display: 'inline-block',
									transform: `translateX(${translateX}px)`,
									filter: `blur(${blur}px)`,
								}}
							>
								{word}
							</span>
						);
					})}
				</div>

				<div
					style={{
						width: 400,
						height: 800,
						borderRadius: 60,
						overflow: 'hidden',
						boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
						border: '10px solid #ccc',
						backgroundColor: '#ffffff',
						opacity: videoSpring,
						marginTop: 100,
						position: 'relative',
						transform: `scale(${zoomScale}) translate(${zoomTranslateX}px, ${zoomTranslateY + microFloat}px) rotateY(${interpolate(videoSpring, [0, 1], [15, 0])}deg)`,
						transformOrigin: 'center center',
					}}
				>
					<OffthreadVideo
						src={staticFile('finance.mp4')}
						startFrom={180}
						playbackRate={1.5}
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
