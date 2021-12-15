// Imports
// Next Imports
import { useRouter } from "next/router";

const Guild = () => {
  const router = useRouter();
  const { guildId } = router.query;

  return <p style={{ color: "white" }}>Guild: {guildId} .</p>;
};

export default Guild;
