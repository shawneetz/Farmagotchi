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
import {SubtleBackground} from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

export const Scene2: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const text = 'Remember your Tamagotchi? This one\'s real.';
	const words = text.split(' ');

	const textStartFrame = 20;

	const fadeOutStart = durationInFrames - 30;
	const sceneOpacity = interpolate(
		frame,
		[fadeOutStart, durationInFrames],
		[1, 0],
		{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
	);

	const phoneSpring = spring({
		frame: Math.max(0, frame - textStartFrame),
		fps,
		config: {damping: 14, stiffness: 120},
	});

	const phoneScale = interpolate(phoneSpring, [0, 1], [0.8, 1]);
	const phoneTranslateX = interpolate(phoneSpring, [0, 1], [150, 0]);
	const phoneRotateY = interpolate(phoneSpring, [0, 1], [15, 0]);

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 80px'}}>
			<SubtleBackground />
			<div style={{display: 'flex', width: '100%', height: '100%', opacity: sceneOpacity, alignItems: 'center'}}>
				<div
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-start',
						paddingRight: 10,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '0.2em',
							fontFamily,
							fontSize: 80,
							fontWeight: 'bold',
							color: '#333',
							textAlign: 'left',
							paddingLeft: 60,
							lineHeight: 1.1,
						}}
					>
						{words.map((word, i) => {
							const delay = i * 3;
							const wordSpring = spring({
								frame: Math.max(0, frame - textStartFrame - delay),
								fps,
								config: {damping: 14, stiffness: 150},
							});

							const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
							const translateX = interpolate(wordSpring, [0, 1], [30, 0]);
							const blur = interpolate(wordSpring, [0, 1], [5, 0]);

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

				<div
					style={{
						flex: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						opacity: interpolate(phoneSpring, [0, 1], [0, 1]),
						transform: `scale(${phoneScale}) translateX(${phoneTranslateX}px) perspective(1000px) rotateY(${phoneRotateY}deg)`,
					}}
				>
					<div
						style={{
							width: 450,
							height: 900,
							borderRadius: 60,
							overflow: 'hidden',
							boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
							border: '10px solid #ccc',
							backgroundColor: '#000',
							position: 'relative',
						}}
					>
						<OffthreadVideo
							src={staticFile('home.mp4')}
							startFrom={300}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
						/>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
