interface Props {
  title: string;
  action?: React.ReactNode;
}

const EmptyState = ({ title, action }: Props) => (
  <div className="empty-state">
    <p>{title}</p>
    {action}
  </div>
);

export default EmptyState;

