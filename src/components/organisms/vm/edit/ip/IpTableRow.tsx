import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

import PageLoading from "src/components/atoms/PageLoading";
import {
    VmNetworkNodeListResponse,
    useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation,
    useGetApiMyVmByProjectIdHostAndVmHostIdIpListQuery,
    useGetApiMyVmByProjectIdNetworkNodeListQuery,
    usePutApiMyVmByProjectIdNetworkNodeDetachAndIdMutation
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { IpTableTableStruct } from "./struct";
import { EnablePortDialog } from "./dialog/EnablePortDialog";
import { DisablePortDialog } from "./dialog/disablePortDialog";
import { IPDeleteDialog } from "./dialog/IPDeleteDialog";
import { DeleteSvg } from "src/components/atoms/svg-icons/DeleteSvg";
import { Cancel, CheckCircleOutline, LockOpenOutlined, LockOutlined } from "@mui/icons-material";

enum DIALOG_TYPE_ENUM {
    CREATE = "CREATE",
    DELETE = "DELETE",
}

export const IpTableRow: FC<{ row: any }> = ({ row }) => {

    const { projectId, id: vmHostId } = useParams();

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEnablePortDialogOpen, setIsEnablePortDialogOpen] = useState(false);
    const [isDisableDialogOpen, setIsDisableDialogOpen] = useState(false);

    const [deleteIp, { isLoading }] = useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation();

    const { refetch, isFetching } =
        useGetApiMyVmByProjectIdHostAndVmHostIdIpListQuery({ projectId: Number(projectId), vmHostId: Number(vmHostId) })

    const handleDelete = () => {
        deleteIp({ projectId: Number(projectId), vmHostId: Number(vmHostId), id: row?.id })
            .unwrap()
            .then(() => {
                toast.success("با موفقیت حذف شد");
                refetch();
            })
            .catch((err) => {
                toast.error("حذف انجام نشد");
            })
            .finally(() => {
                setIsDeleteDialogOpen(false);
            });
    };

    const openDeleteDialog = () => {
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };

    return (
        <Fragment>
            {isLoading && <PageLoading />}
            <DorsaTableRow hover tabIndex={-1} key={row.value}>
                {IpTableTableStruct.map((column) => {
                    const value = row[column.id];
                    const text = column.format ? column.format(value) : value;
                    const statusId = row.statusId;

                    return (
                        <DorsaTableCell
                            key={column.id}
                            align="center"
                            sx={{ px: 1, whiteSpace: "nowrap" }}
                        >
                            {column.id === "control" ? (
                                <Stack direction="row" columnGap={1} alignItems="center">
                                    <IconButton onClick={openDeleteDialog}>
                                        <TrashSvg />
                                    </IconButton>
                                  
                                    {
                                        row?.isEnableSecurity ? <>
                                            <Tooltip title="فعال سازی غیرport security">
                                                <IconButton onClick={() => setIsDisableDialogOpen(true)} sx={{ cursor: "pointer" }}>
                                                    <LockOpenOutlined sx={{ color: "grey.700" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                            :

                                            <Tooltip title="فعال سازی port security">
                                                <IconButton onClick={() => setIsEnablePortDialogOpen(true)} sx={{ cursor: "pointer" }}>
                                                    <LockOutlined sx={{ color: "grey.700" }} />
                                                </IconButton>
                                            </Tooltip>
                                    }

                                </Stack>
                            )
                                : column.id === "isPrimary" ? (
                                    row?.isPrimary ? (
                                        <CheckCircleOutline sx={{ color: "grey.700" }} />
                                      ) : (
                                        <Cancel sx={{ color: "grey.700" }} />
                                      )
                                ) : column.id === "isFloating" ? (
                                    row?.isFloating ? (
                                        <CheckCircleOutline sx={{ color: "success" }} />
                                      ) : (
                                        <Cancel sx={{ color: "grey.700" }} />
                                      )
                                ): column.id === "isV4" ? (
                                    <Chip size="small" label={row.isV4 ? "IPv4" : "IPv6"} />
                                ): (
                                    text
                                )}
                        </DorsaTableCell>
                    );
                })}
            </DorsaTableRow>
            <IPDeleteDialog
                open={isDeleteDialogOpen}
                onClose={closeDeleteDialog}
                onConfirm={handleDelete}
                title="حذف IP"
                message="آیا از حذف این IP اطمینان دارید؟ این عمل غیرقابل بازگشت است."
            />
            <EnablePortDialog
                openDialog={isEnablePortDialogOpen}
                handleClose={() => setIsEnablePortDialogOpen(false)}
                id={Number(row?.id)}
                refetch={refetch}
            />
            <DisablePortDialog
                openDialog={isDisableDialogOpen}
                handleClose={() => setIsDisableDialogOpen(false)}
                id={row?.id}
                refetch={refetch} />
        </Fragment>
    );
};

export default withTableRowWrapper(IpTableRow);
