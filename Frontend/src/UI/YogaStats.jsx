import Stat from "./Stat";
import styled from "styled-components";
import { GrYoga } from "react-icons/gr";
import { ImHappy } from "react-icons/im";
import { MdOutlineLiveTv } from "react-icons/md";
import { IoMdStopwatch } from "react-icons/io";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* grid-template-rows: auto 34rem auto; */
  gap: 2.4rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
function YogaStats() {
  return (
    <StyledDashboardLayout>
      <Stat title="80+" color="blue" icon={<GrYoga />} value="Poses Mastered" />
      <Stat
        title="5000+"
        color="green"
        icon={<ImHappy />}
        value="Happy Students"
      />
      <Stat
        title="50+"
        color="yellow"
        icon={<MdOutlineLiveTv />}
        value="Live Sessions Monthly"
      />
      <Stat
        title="24/7"
        color="blue"
        icon={<IoMdStopwatch />}
        value="Practice anytime"
      />
    </StyledDashboardLayout>
  );
}

export default YogaStats;
