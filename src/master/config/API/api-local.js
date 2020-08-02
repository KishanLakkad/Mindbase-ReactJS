const protocol = "http";
const host = "ec2-3-135-119-95.us-east-2.compute.amazonaws.com";
const port = "5000";
const trailUrl = "api/v1";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl ? '/' + trailUrl : ''}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
