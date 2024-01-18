export const kubernetesNodeType = (id: number) => {
  if (id === 1) {
    return { label: "master", id: 1 };
  } else {
    return { label: "worker", id: 2 };
  }
};
