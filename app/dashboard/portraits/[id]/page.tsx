const PortraitsDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;
  return <div>PortraitsDetailPage ID: {resolvedParams.id}</div>;
};

export default PortraitsDetailPage;
