import { FC } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { NodeConfig } from "src/components/organisms/kubernetes/edit/editNodes/addNode/NodeConfig";
import { useAppSelector } from "src/app/hooks";
import { usePostApiMyKubernetesNodeCreateMutation } from "src/app/services/api.generated";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";

type AddNodeKubernetesPropsType = {};

const AddNodeKubernetes: FC<AddNodeKubernetesPropsType> = () => {
  const { id: hostId } = useParams();

  const navigate = useNavigate();

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
    })
      .unwrap()
      .then(() => {
        navigate(`/kubernetes/${hostId}`);
      })
      .catch((err) => {});
  };

  return (
    <Grid2 container spacing={4}>
      <Grid2 xs={12} md={8}>
        <NodeConfig />
      </Grid2>
      <Grid2 xs={12} md={4} sx={{ position: "sticky", top: 0 }}>
        <ServiceReceipt
          receiptType={ReceiptTypeEnum.PREDEFINED_BUNDLE}
          submitHandler={onSubmitClick}
          submitButtonIsLoading={createNodeLoading}
          receiptItemName={productBundle?.name || "سرور"}
          receiptItemNumber="۱"
          reciptItemPrice={Math.floor(productBundle?.price || 0).toLocaleString(
            "fa-IR"
          )}
          totalPrice={Math.floor(
            (productBundle?.price || 0) * 1.1
          ).toLocaleString("fa-IR")}
          vat={Math.floor((productBundle?.price || 0) * 0.1).toLocaleString(
            "fa-IR"
          )}
        />
      </Grid2>
    </Grid2>
  );
};

export default AddNodeKubernetes;
