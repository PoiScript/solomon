import * as request from 'request-promise';
import { config } from 'firebase-functions';
import { Response } from 'express';

const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';

function returnErrorResponse (res: Response, code: string, message: string) {
  res.status(500);
  res.json({error: {code, message}});
}

export const endpoints = {
  getUser: 'getAccountInfo',
  deleteUser: 'deleteAccount',
  updateUser: 'setAccountInfo',
  sendPasswordResetEmail: 'getOobConfirmationCode',
  verifyPasswordReset: 'resetPassword',
  confirmPasswordReset: 'resetPassword',
  sendVerificationEmail: 'getOobConfirmationCode',
  confirmEmailVerification: 'setAccountInfo'
};

export function apiRequest (endpoint: string, body: any) {
  return request({
    uri: baseUrl + endpoint,
    method: 'POST',
    body: body,
    json: true,
    qs: {key: config().firebase.apiKey},
    headers: {'Content-Type': 'application/json'}
  });
}

export function handleError (error, res: Response) {
  console.error(error);
  returnErrorResponse(res, error.code, error.message);
}

export function notFound (res: Response) {
  returnErrorResponse(res, 'solomon/not-found', 'Request API Not Found');
}
