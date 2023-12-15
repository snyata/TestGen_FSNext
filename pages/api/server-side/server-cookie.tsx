import { GetServerSideProps } from 'next';
import Cookies from 'cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = Cookies.parse(req.headers.cookie || '');
  const username = Cookies.username || 'Guest';

  return { props: { username } };
};

const SomePage = ({ username }) => {
  return <div>Welcome, {username}!</div>;
};

export default SomePage;