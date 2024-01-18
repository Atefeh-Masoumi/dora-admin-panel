import { FC } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { KuberServiceReceipt } from "src/components/organisms/kubernetes/add/steps/KuberServiceReceipt";
import { NodeConfig } from "src/components/organisms/kubernetes/edit/editNodes/addNode/NodeConfig";
import { useAppSelector } from "src/app/hooks";
import { usePostApiMyKubernetesNodeCreateMutation } from "src/app/services/api.generated";
import { useParams } from "react-router";

type AddNodeKubernetesPropsType = {};

const AddNodeKubernetes: FC<AddNodeKubernetesPropsType> = () => {
  const { id: hostId } = useParams();

  const { productBundle, nodeType, vmPassword } = useAppSelector(
    (store) => store.createNode
  );

  const [createNode, { isLoading: createNodeLoading }] =
    usePostApiMyKubernetesNodeCreateMutation();

  const onSubmitClick = () => {
    console.log({ nodeType });
    if (!nodeType || !vmPassword) return;

    const isMaster = nodeType === 1;

    createNode({
      createKubernetesNodeModel: {
        kubernetesHostId: Number(hostId),
        kubernetesNodeTypeId: nodeType,
        isPredefined: !isMaster,
        productBundleId: !isMaster ? productBundle?.id : null,
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
        <KuberServiceReceipt
          serverPrice={productBundle?.price || 0}
          serverName={productBundle?.name || ""}
          workersCount={1}
          submitHandler={onSubmitClick}
          submitLoading={createNodeLoading}
        />
      </Grid2>
    </Grid2>
  );
};

export default AddNodeKubernetes;
