interface Props {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
  if (pages <= 1) return null;

  const items = Array.from({ length: pages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={item === page ? 'active' : ''}
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

