import { FC } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AddNode } from "src/components/organisms/kubernetes/edit/editNodes/add/AddNode";
import { AddNodeReceipt } from "src/components/organisms/kubernetes/edit/editNodes/add/AddNodeReceipt";

type AddNodeKubernetesPropsType = {};

const AddNodeKubernetes: FC<AddNodeKubernetesPropsType> = () => {
  return (
    <Grid2 container>
      <Grid2 xs={12} md={8}>
        <AddNode />
      </Grid2>
      <Grid2 xs={12} md={4}>
        <AddNodeReceipt />
      </Grid2>
    </Grid2>
  );
};

export default AddNodeKubernetes;
