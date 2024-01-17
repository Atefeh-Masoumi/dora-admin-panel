import { FC, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { KuberServiceReceipt } from "src/components/organisms/kubernetes/add/steps/KuberServiceReceipt";
import { NodeConfig } from "src/components/organisms/kubernetes/edit/editNodes/addNode/NodeConfig";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import { useAppSelector } from "src/app/hooks";
import { usePostApiMyKubernetesNodeCreateMutation } from "src/app/services/api.generated";

type AddNodeKubernetesPropsType = {};

const AddNodeKubernetes: FC<AddNodeKubernetesPropsType> = () => {
  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const productBundle = useAppSelector(
    (store) => store.createNode.productBundle
  );

  const [createNode, { isLoading: createNodeLoading }] =
    usePostApiMyKubernetesNodeCreateMutation();

  const onSubmitClick = () => {
    createNode({
      createKubernetesNodeModel: {
        // kubernetesNodeTypeId
        // isPredefined
        // productBundleId
        // nodeCount
        // cpu
        // memory
        // disk
      } as any,
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
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          submitHandler={onSubmitClick}
          submitLoading={createNodeLoading}
        />
      </Grid2>
    </Grid2>
  );
};

export default AddNodeKubernetes;
