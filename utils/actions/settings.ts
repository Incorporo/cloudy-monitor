'use server';

import 'server-only';

import { z } from 'zod';

import { q } from '../db';
import { actionWithSession } from './_action';

export const updateCacheHeader = actionWithSession(
	z.object({
		cacheHeader: z.string(),
	}),
	async ({ cacheHeader }, ctx) => {
		if (!ctx.user?.admin) throw new Error('Unauthorized');

		const resp = await q.updateSettingsRecord('general', 'cache-header', cacheHeader, ctx.user.id);

		if (!resp) throw new Error('Failed to update record');

		return resp;
	},
);
