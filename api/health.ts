export default async (_req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
};
