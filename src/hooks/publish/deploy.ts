/* eslint-disable max-lines-per-function */
import {
  createDeployment,
  DeploymentOptions,
  VercelClientOptions,
} from '@vercel/client';
import bytes from 'bytes';
import { Signale } from 'signale';

import { getError } from '../../errors/get-error';
import { stringify } from '../../utils';

export const deploy = async (
  clientOptions: VercelClientOptions,
  deploymentOptions: DeploymentOptions,
  logger: Signale<'error' | 'success' | 'warn' | 'log'>,
): Promise<void> => {
  for await (const { type, payload } of createDeployment(
    clientOptions,
    deploymentOptions,
  )) {
    switch (type) {
      case 'hashes-calculated':
        logger.success('Hashes calculated');
        break;
      case 'file-count': {
        const { total, missing } = payload;
        logger.info(`Total files ${total.size}, ${missing.length} changed`);
        break;
      }
      case 'file-uploaded':
        logger.success(
          `Uploaded: ${payload.file.names.join(' ')} (${bytes(
            payload.file.data.length,
          )})`,
        );
        break;
      case 'all-files-uploaded':
        logger.success('All files uploaded');
        break;
      case 'created':
        logger.success(
          `Created deployment on Vercel. See ${payload.inspectorUrl}`,
        );
        break;
      case 'building':
        logger.info('Building...');
        break;
      case 'ready':
        logger.success('Ready');
        break;
      case 'alias-assigned':
        logger.info('Alias assigned');
        break;
      case 'warning':
        logger.warn('Warning', stringify(payload));
        break;
      case 'notice':
        logger.info('Notice', stringify(payload));
        break;
      case 'tip':
        logger.note('Tip', stringify(payload));
        break;
      case 'canceled':
        logger.info('Canceled');
        break;
      case 'checks-registered':
        logger.info('Checks registered');
        break;
      case 'checks-completed':
        logger.success('Checks completed');
        break;
      case 'checks-running':
        logger.info('Checks running');
        break;
      case 'checks-conclusion-succeeded':
        logger.success('Checks conclusion succeeded');
        break;
      case 'checks-conclusion-skipped':
        logger.info('Checks conclusion skipped');
        break;
      case 'checks-conclusion-canceled':
        logger.warn('Checks conclusion canceled');
        break;
      case 'checks-conclusion-failed':
        throw getError('EVERCELCHECKSCONCLUSIONFAILED', { payload });
      case 'error': {
        throw getError('EVERCELDEPLOY', { payload });
      }
    }
  }
};
