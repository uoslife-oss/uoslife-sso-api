export type VerificationRequestCommand =
  | RequestWithEmailCommand
  | RequestWithPortalCommand
  | RequestWithDocumentCommand;

export type VerificationCallback = {
  id: string;
  code: string;
};

export type RequestWithEmailCommand = {
  type: 'email';
  email: string;
};

export type RequestWithPortalCommand = {
  type: 'portal';
  portalUsername: string;
  portalPassword: string;
};

export type RequestWithDocumentCommand = {
  type: 'document';
  attachmentUrl: string;
};
