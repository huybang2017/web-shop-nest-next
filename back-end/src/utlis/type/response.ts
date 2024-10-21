export type reponse = {
  statusCode: number;
  message: string;
  data: any;
};

export type errorResponse = {
  statusCode: number;
  message: string;
  error: string;
};
