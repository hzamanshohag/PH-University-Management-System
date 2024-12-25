import { TErrorSources } from '../interface/error';

type ErrorType = {
  message: string;
};

const handleDuplicateError = (err: ErrorType) => {
  // Extract values between double quotes
  const matches: RegExpMatchArray | null = err.message.match(/"([^"]*)"/g);
  let extractedMessage: string[] = [];

  if (matches) {
    extractedMessage = matches.map((match: string) => match.slice(1, -1)); // Remove surrounding quotes
  }

  const errorSources: TErrorSources = [
    {
      path: '',
      message:
        extractedMessage.length > 0
          ? `${extractedMessage.join(', ')} is already exists`
          : 'Something went wrong',
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateError;
