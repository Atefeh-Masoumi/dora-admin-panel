import { FC } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { KuberServiceReceipt } from "src/components/organisms/kubernetes/add/steps/KuberServiceReceipt";
import { NodeConfig } from "src/components/organisms/kubernetes/edit/editNodes/addNode/NodeConfig";
import { useAppSelector } from "src/app/hooks";
import { usePostApiMyKubernetesNodeCreateMutation } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

type AddNodeKubernetesPropsType = {};

const AddNodeKubernetes: FC<AddNodeKubernetesPropsType> = () => {
  const { id: hostId } = useParams();

  const { productBundle, nodeType, vmPassword } = useAppSelector(
    (store) => store.createNode
  );

  const [createNode, { isLoading: createNodeLoading }] =
    usePostApiMyKubernetesNodeCreateMutation();

  const onSubmitClick = () => {
    if (!hostId || !nodeType || !vmPassword || !productBundle) {
      toast.error("تمام ورودی‌های این بخش اجباری است");
      return;
    }

    createNode({
      createKubernetesNodeModel: {
        kubernetesHostId: Number(hostId),
        kubernetesNodeTypeId: nodeType,
        isPredefined: true,
        productBundleId: productBundle?.id,
        vmPassword: vmPassword,
        cpu: null,
        memory: null,
        disk: null,
      },
    });
  };

  return (
    <Grid2 container spacing={4}>
      <Grid2 xs={12} md={8}>
        <NodeConfig />
      </Grid2>
      <Grid2 xs={12} md={4}>
        <Box sx={{ position: "sticky", top: 0 }}>
          <KuberServiceReceipt
            serverPrice={productBundle?.price || 0}
            serverName={productBundle?.name || ""}
            workersCount={1}
            submitHandler={onSubmitClick}
            submitLoading={createNodeLoading}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default AddNodeKubernetes;
