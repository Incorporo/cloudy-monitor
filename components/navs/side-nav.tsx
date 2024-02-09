'use client';

import { GearSix,HardDrives, Monitor } from '../icons';
import { useLocation } from '../providers';
import { useAuth } from '../providers/auth-provider';
import { NavLink } from './nav-link';
import { UserDropdown } from './user-dropdown';

const SideNavSection = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col gap-1">{children}</div>
);

export const SideNav = (): JSX.Element => {
	const { buckets } = useLocation();
	const { user } = useAuth();

	return (
		<nav className="flex min-w-2xs max-w-2xs flex-grow flex-col gap-4 border-r-1 border-secondary bg-secondary/20 p-4 dark:border-secondary-dark dark:bg-secondary-dark/20">
			<h4>INCORPO.RO FREE RESOURCES</h4>

			<SideNavSection>
				<NavLink href="/">
					<Monitor weight="bold" className="h-5 w-5" />
					Overview
				</NavLink>
			</SideNavSection>

			<SideNavSection>
				<span className="text-sm font-semibold">Categories</span>

				{buckets.map((bucket) => (
					<NavLink key={bucket.raw} href={`/bucket/${bucket.raw}`} exact={false}>
						<HardDrives weight="bold" className="h-5 w-5" /> {bucket.parsed}
					</NavLink>
				))}
			</SideNavSection>

			{!!user?.admin && (
				<NavLink href="/settings" className="mt-auto">
					<GearSix weight="bold" className="h-5 w-5" />
					Settings
				</NavLink>
			)}
		</nav>
	);
};
