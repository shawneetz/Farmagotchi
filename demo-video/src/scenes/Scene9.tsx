import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
} from 'remotion';
import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

const CasualTextReveal: React.FC<{text: string; delay?: number}> = ({text, delay = 0}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: Math.max(0, frame - delay),
		config: {damping: 24, stiffness: 80, mass: 1}, // Slightly stiffer
	});

	const translateY = interpolate(progress, [0, 1], [30, 0]);
	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const blur = interpolate(progress, [0, 1], [12, 0]);

	return (
		<div style={{
			fontSize: 70,
			fontFamily,
			color: '#121212',
			opacity,
			transform: `translateY(${translateY}px)`,
			filter: `blur(${blur}px)`,
			letterSpacing: '-2px',
			textAlign: 'center',
			marginBottom: '20px'
		}}>
			{text}
		</div>
	);
};

const LogoAndName: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: Math.max(0, frame - 50),
		config: {damping: 20, stiffness: 60},
	});

	const opacity = interpolate(progress, [0, 0.5], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp'
	});
	
	const rotation = interpolate(progress, [0, 1], [-25, 0]);
	const wipeProgress = interpolate(progress, [0, 1], [100, 0]);

	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: '60px',
			opacity,
		}}>
			<div style={{
				width: 140,
				height: 140,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transform: `rotate(${rotation}deg)`
			}}>
				<Img 
					src={staticFile('Logo-only.png')} 
					style={{width: '100%', height: '100%', objectFit: 'contain'}} 
				/>
			</div>
			
			<div style={{
				fontSize: 130,
				fontFamily,
				color: '#121212',
				letterSpacing: '-4px',
				clipPath: `inset(0 ${wipeProgress}% 0 0)`, 
				marginLeft: '30px',
				whiteSpace: 'nowrap'
			}}>
				Farmagotchi
			</div>
		</div>
	);
};

const CasualLink: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame: Math.max(0, frame - 90),
		config: {damping: 20, stiffness: 80},
	});

	const opacity = interpolate(progress, [0, 1], [0, 1]);
	const underlineWidth = interpolate(progress, [0, 1], [0, 100]);

	return (
		<div style={{ 
			marginTop: '80px', 
			display: 'flex', 
			flexDirection: 'column', 
			alignItems: 'center', 
			opacity 
		}}>
			<div style={{
				fontSize: 50,
				fontFamily,
				color: '#121212',
				letterSpacing: '-1px',
			}}>
        team day[0]
			</div>
			<div style={{
				height: '4px',
				backgroundColor: '#121212',
				width: `${underlineWidth}%`,
				marginTop: '8px',
				borderRadius: '2px'
			}} />
		</div>
	);
};

export const Scene9: React.FC = () => {
	const frame = useCurrentFrame();
	// Slower drift up over a longer duration
	const driftY = interpolate(frame, [0, 900], [30, -120]);

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
			<SubtleBackground />
			<div style={{ 
				display: 'flex', 
				flexDirection: 'column', 
				alignItems: 'center', 
				transform: `translateY(${driftY}px)` 
			}}>
				<CasualTextReveal text="Keep your plants happy." delay={0} />
				<CasualTextReveal text="Keep yourself happy." delay={20} />
				
				<LogoAndName />
				
				<CasualLink />
			</div>
		</AbsoluteFill>
	);
};