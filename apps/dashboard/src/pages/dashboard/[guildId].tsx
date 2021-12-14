// Imports
// Next Imports
import { useRouter } from 'next/router';

const Guild = () => {
  const router = useRouter();
  const { id: guildId } = router.query;

  return <p>Guild: {guildId}</p>;
};

export default Guild;
