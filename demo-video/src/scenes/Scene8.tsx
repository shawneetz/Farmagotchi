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

export const Scene8: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const fadeOutStart = durationInFrames - 30;
	const globalOpacity = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'transparent',
				display: 'flex',
				flexDirection: 'row',
			}}
		>
			<SubtleBackground />
			<div
				style={{
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '0 80px',
					paddingLeft: '120px',
					opacity: globalOpacity,
				}}
			>
				<TextContent frame={frame} />
			</div>

			<div
				style={{
					flex: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity: globalOpacity,
				}}
			>
				<VideoContent frame={frame} />
			</div>
		</AbsoluteFill>
	);
};

const TextContent: React.FC<{frame: number}> = ({frame}) => {
	const {fps} = useVideoConfig();
	const text = 'Got more green friends? Track them all in Farmagotchi.';
	const words = text.split(' ');

	return (
		<div
			style={{
				fontFamily,
				fontSize: 80,
				fontWeight: 'bold',
				color: '#333',
				display: 'flex',
				flexWrap: 'wrap',
				gap: '0.4em',
				lineHeight: '1.2',
			}}
		>
			{words.map((word, i) => {
				const delay = i * 12; // increased from 4
				
				const wordSpring = spring({
					frame: Math.max(0, frame - delay),
					fps,
					config: {damping: 20, stiffness: 60} // softer springs
				});

				const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
				const translateY = interpolate(wordSpring, [0, 1], [40, 0]);
				const blur = interpolate(wordSpring, [0, 1], [5, 0]);

				return (
					<span
						key={i}
						style={{
							opacity,
							transform: `translateY(${translateY}px)`,
							display: 'inline-block',
							filter: `blur(${blur}px)`,
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};

const VideoContent: React.FC<{frame: number}> = ({frame}) => {
	const {fps} = useVideoConfig();
	
	const videoSpring = spring({
		frame: Math.max(0, frame - 40),
		fps,
		config: {damping: 20, stiffness: 40}
	});

	const opacity = interpolate(videoSpring, [0, 1], [0, 1]);
	const translateY = interpolate(videoSpring, [0, 1], [100, 0]);
	const rotateY = interpolate(videoSpring, [0, 1], [-15, 0]);
	
	const microFloat = Math.sin(frame / 60) * 15; // Slower float

	return (
		<div
			style={{
				width: 450,
				height: 900,
				borderRadius: 65,
				overflow: 'hidden',
				boxShadow: '0 40px 80px rgba(0,0,0,0.2)',
				border: '12px solid #ccc',
				backgroundColor: '#ffffff',
				opacity,
				transform: `translateY(${translateY + microFloat}px) perspective(1000px) rotateY(${rotateY}deg)`,
				padding: 10,
			}}
		>
			<OffthreadVideo
				src={staticFile('newplotworkflow.mp4')}
				playbackRate={1.5} // slowed down significantly
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					borderRadius: 50,
				}}
			/>
		</div>
	);
};