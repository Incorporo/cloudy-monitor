import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { ExplorerEventsProvider, ObjectExplorerProvider, ObjectPreview } from '@/components';
import { formatBucketName, formatFullPath } from '@/utils';
import { validateBucketName } from '@/utils/cf';

import { Ctx } from './ctx';

export type RouteParams = { bucket: string; path?: string[] };
type Props = { params: RouteParams; children: React.ReactNode };

export const generateMetadata = ({ params }: { params: RouteParams }): Metadata => ({
	title: formatBucketName(params.bucket),
});

const Layout = async ({ params: { bucket, path }, children }: Props): Promise<JSX.Element> => {
	const fullPath = formatFullPath(path);
	if (!(await validateBucketName(bucket))) return notFound();

	return (
		<>
			<Ctx bucketName={bucket} path={fullPath} />

			<ObjectExplorerProvider>
				<ExplorerEventsProvider>
					{children}

					<ObjectPreview />
				</ExplorerEventsProvider>
			</ObjectExplorerProvider>
		</>
	);
};

export default Layout;
