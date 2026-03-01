import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	staticFile,
	OffthreadVideo,
	useVideoConfig,
	spring,
	Sequence,
	Easing,
} from 'remotion';

import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

export const Scene7: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const screen1Start = 0;
	const screen1Duration = 60;
	const screen2Start = screen1Start + screen1Duration;
	const screen2Duration = 70;
	const videoStart = screen2Start + screen2Duration; // Starts at 130 frames
	const videoDuration = durationInFrames - videoStart; 

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'transparent',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<SubtleBackground />
			<Screen1
				frame={frame - screen1Start}
				duration={screen1Duration}
				isActive={frame >= screen1Start && frame < screen1Start + screen1Duration + 30} // Keep it around slightly to let it spring out
			/>
			<Screen2
				frame={frame - screen2Start}
				duration={screen2Duration}
				fps={fps}
				isActive={frame >= screen2Start && frame < screen2Start + screen2Duration}
			/>
			<Sequence from={videoStart} durationInFrames={videoDuration}>
				<VideoSequence />
			</Sequence>
		</AbsoluteFill>
	);
};

const Screen1: React.FC<{frame: number; duration: number; isActive: boolean}> = ({
	frame,
	duration,
	isActive,
}) => {
	const {fps} = useVideoConfig();
	if (!isActive) return null;

	const text = 'Got any more questions?';
	const words = text.split(' ');

	return (
		<div
			style={{
				fontFamily,
				fontSize: 80,
				fontWeight: 'bold',
				color: '#333',
				textAlign: 'center',
				width: '80%',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: '0.4em',
			}}
		>
			{words.map((word, i) => {
				const delayIn = i * 2;
				const delayOut = duration - 10 + i * 2; // Stagger out
				
				const springIn = spring({
					frame: Math.max(0, frame - delayIn),
					fps,
					config: {damping: 14, stiffness: 150}
				});

				const springOut = spring({
					frame: Math.max(0, frame - delayOut),
					fps,
					config: {damping: 14, stiffness: 150}
				});

				const translateYIn = interpolate(springIn, [0, 1], [50, 0]);
				const translateYOut = interpolate(springOut, [0, 1], [0, 200]); // Violent spring down
				
				const opacityIn = interpolate(springIn, [0, 1], [0, 1]);
				const opacityOut = interpolate(springOut, [0, 1], [1, 0]);

				const isOut = frame >= delayOut;
				
				return (
					<span
						key={i}
						style={{
							opacity: isOut ? opacityOut : opacityIn,
							transform: `translateY(${isOut ? translateYOut : translateYIn}px)`,
							display: 'inline-block',
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};

const Screen2: React.FC<{frame: number; duration: number; fps: number; isActive: boolean}> = ({
	frame,
	duration,
	fps,
	isActive,
}) => {
	if (!isActive) return null;

	const text = 'Ask the crops yourself.';
	const words = text.split(' ');

	const fadeOutStart = duration - 15;
	const globalOpacity = interpolate(frame, [fadeOutStart, duration], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				fontFamily,
				fontSize: 120,
				fontWeight: 'bold',
				color: '#333',
				textAlign: 'center',
				width: '90%',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: '0.4em',
				opacity: globalOpacity,
			}}
		>
			{words.map((word, i) => {
				const delay = i * 4;
				
				const scale = spring({
					frame: frame - delay,
					fps,
					config: {damping: 12, stiffness: 180}, // Even snappier
				});

				const rotate = interpolate(scale, [0, 1], [-15, 0], {
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				});

				const isEmphasis = i === words.length - 1; 
				const color = isEmphasis ? '#7A9E46' : '#333';
				const scaleMultiplier = isEmphasis ? 1.1 : 1;

				return (
					<span
						key={i}
						style={{
							display: 'inline-block',
							transform: `scale(${scale * scaleMultiplier}) rotate(${rotate}deg)`,
							color,
							textShadow: isEmphasis ? '4px 4px 0px rgba(0,0,0,0.1)' : 'none',
						}}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
};

const VideoSequence: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const opacity = interpolate(
		frame,
		[0, 20, durationInFrames - 30, durationInFrames],
		[0, 1, 1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const easeInOutCubic = Easing.bezier(0.65, 0, 0.35, 1);

	// Compress timings for the 20s scene
	const scale = interpolate(
		frame,
		[0, 120, 360],
		[1, 1, 2.5],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeInOutCubic,
		}
	);

	const translateY = interpolate(
		frame,
		[
			0,
			120, 160,
			300, 600,
			640, 870,
			900, 940,
		],
		[
			0,
			0, 0,
			-400, 0,
			0, -400,
			-300, -200,
		],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: easeInOutCubic,
		}
	);

	const videoSpring = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 100},
	});
	
	const microFloat = Math.sin(frame / 25) * 6;

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
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
					transform: `scale(${scale}) translateY(${translateY + microFloat}px) perspective(1000px) rotateX(${interpolate(videoSpring, [0,1], [15, 0])}deg)`,
					padding: 10,
				}}
			>
				<OffthreadVideo
					src={staticFile('aichat.mp4')}
					startFrom={180}
					playbackRate={1.8} // Speed up video
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
