import { strict as assert } from 'node:assert';
import { test, describe } from 'node:test';
import { app } from '../server';

describe('First Security Test — Multi-Tenant Household Authorization Boundary', () => {
  test('User A can access Household A transactions', async () => {
    // We test the authorization logic by invoking our express handler
    const req: any = {
      headers: { 'x-user-id': 'user-silva-1' },
      params: { householdId: 'hh-silva-demo' },
      body: {},
    };

    let forbidden = false;
    const res: any = {
      status(code: number) {
        if (code === 403) forbidden = true;
        return this;
      },
      json(data: any) {
        return data;
      },
    };

    const next = () => {};

    const { authorizeHouseholdAccess } = await import('../server');
    authorizeHouseholdAccess(req, res, next);

    assert.equal(forbidden, false, 'Authorized member should NOT receive 403 Forbidden');
  });

  test('User A attempting to access Household B receives 403 Forbidden', async () => {
    // User A (user-silva-1) attempts to query Household B (hh-other-secret)
    const req: any = {
      headers: { 'x-user-id': 'user-silva-1' },
      params: { householdId: 'hh-other-secret' },
      body: {},
    };

    let statusCode = 200;
    let responseData: any = null;

    const res: any = {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(data: any) {
        responseData = data;
        return data;
      },
    };

    const next = () => {};

    const { authorizeHouseholdAccess } = await import('../server');
    authorizeHouseholdAccess(req, res, next);

    assert.equal(statusCode, 403, 'Cross-household access attempt MUST return 403 Forbidden');
    assert.equal(responseData.error.code, 'FORBIDDEN_HOUSEHOLD_ACCESS');
  });
});
