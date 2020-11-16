import React, { useEffect, useState } from 'react';
import auth0 from '../utils/auth0';
import { Box } from '@cu-advancement/component-library';
import AdminLayout from '../components/global/AdminLayout';

const Profile = ({ user }) => {
  // console.log(session);
  return (
    <>
      <AdminLayout>
        <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4, p: 3, bg: 'gray' }}>
          <ul>
            {Object.keys(user).map((el) => (
              <li key={el}>{`${el} --- ${user[el]}`}</li>
            ))}
          </ul>
        </Box>
      </AdminLayout>
    </>
  );
};

export default Profile;

export async function getServerSideProps({ req, res }) {
  // Check for cookie and use that if there?
  // console.log(req.cookies['a0:session']);

  // Only do on client-side.
  if (typeof window === 'undefined') {
    // Get Auth0 session and redirect to login if no user.
    const session = await auth0.getSession(req);
    if (!session || !session.user) {
      res.writeHead(302, {
        Location: '/api/login',
      });
      res.end();
      return;
    }

    // Set cookie for next request?
  }

  // Grab user info from db.
  const user = session.user;

  return { props: { user } };
}
