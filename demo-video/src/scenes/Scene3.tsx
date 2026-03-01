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

export const Scene3: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const text = 'Keep tabs on your routine.';
	const words = text.split(' ');

	const textInStartFrame = 20;
	const textOutStartFrame = 150; 

	const fadeOutStart = durationInFrames - 30;
	const sceneOpacity = interpolate(
		frame,
		[fadeOutStart, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const videoFadeIn = spring({
		frame: Math.max(0, frame - 160),
		fps,
		config: {damping: 14, stiffness: 100},
	});

	const easeInOutExpo = Easing.bezier(0.87, 0, 0.13, 1);

	const scale = interpolate(
		frame,
		[160, 200, 300, 350, 500, 600],
		[0.2, 1.2, 2.5, 2.5, 2.5, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOutExpo }
	);

	const translateY = interpolate(
		frame,
		[320, 350, 500, 550],
		[0, -200, -200, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOutExpo }
	);

	const microFloat = Math.sin(frame / 30) * 8;
	const finalTranslateY = translateY + microFloat;

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
			<SubtleBackground />
			<div style={{width: '100%', height: '100%', opacity: sceneOpacity, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: videoFadeIn}}>
					<div
						style={{
							width: 400,
							height: 800,
							borderRadius: 60,
							overflow: 'hidden',
							boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
							border: '10px solid #ccc',
							backgroundColor: '#ffffff',
							transform: `scale(${scale}) translateY(${finalTranslateY}px) perspective(1000px) rotateX(${interpolate(videoFadeIn, [0,1], [10, 0])}deg)`,
							padding: 15,
						}}
					>
						<OffthreadVideo
							src={staticFile('tasker.mp4')}
							playbackRate={2.6}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					</div>
				</AbsoluteFill>

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
						zIndex: 10,
						width: '80%',
					}}
				>
					{words.map((word, i) => {
						const delayIn = i * 3;
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
							: interpolate(wordSpringOut, [0, 1], [0, -150]);
						
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
			</div>
		</AbsoluteFill>
	);
};
