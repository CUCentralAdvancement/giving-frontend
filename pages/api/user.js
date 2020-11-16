import auth0 from '../../utils/auth0';

export default async function user(req, res) {
  try {
    await auth0.handleProfile(req, res, { refetch: true });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
