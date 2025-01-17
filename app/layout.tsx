import './globals.css';

import localFont from 'next/font/local';

import type { Metadata } from 'next';

import { LocationProvider, SettingsProvider,SideNav, ThemeProvider, TopNav } from '@/components';
import { AuthProvider } from '@/components/providers/auth-provider';
import { getUser } from '@/utils/auth';
import { getBuckets } from '@/utils/cf';

export const runtime = 'edge';

const TASAOrbiterText = localFont({
	variable: '--font-tasa-orbiter-text',
	src: [
		{ path: '../utils/fonts/TASAOrbiterText-Regular.otf', weight: '400' },
		{ path: '../utils/fonts/TASAOrbiterText-Medium.otf', weight: '500' },
		{ path: '../utils/fonts/TASAOrbiterText-SemiBold.otf', weight: '600' },
		{ path: '../utils/fonts/TASAOrbiterText-Bold.otf', weight: '700' },
	],
});

export const metadata: Metadata = {
	title: {
		default: 'Cloudy',
		template: '%s | Cloudy',
	},
	description: 'File explorer for Cloudflare R2 Storage.',
	icons: {
		icon: [{ url: '/favicon.ico', type: 'image/x-icon', sizes: 'any', rel: 'icon' }],
		shortcut: [
			{ url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16', rel: 'shortcut icon' },
			{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32', rel: 'shortcut icon' },
		],
		apple: {
			url: '/apple-touch-icon.png',
			type: 'image/png',
			sizes: '180x180',
			rel: 'apple-touch-icon',
		},
	},
	manifest: '/site.webmanifest',
};

type Props = { children: React.ReactNode };

const Layout = async ({ children }: Props) => {
	const buckets = await getBuckets();
	const user = await getUser();

	return (
		<html lang="en">
			<body className={TASAOrbiterText.variable}>
				<AuthProvider user={user}>
					<ThemeProvider attribute="data-theme" defaultTheme="light">
						<SettingsProvider>
							<LocationProvider buckets={buckets}>
								<div className="flex flex-grow flex-row bg-background dark:bg-background-dark">
									<SideNav />

									<div className="flex h-screen flex-grow flex-col">
										<TopNav />

										{children}
									</div>
								</div>
							</LocationProvider>
						</SettingsProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
};

export default Layout;
