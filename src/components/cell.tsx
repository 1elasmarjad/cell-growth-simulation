export default function Cell({
  row,
  col,
  occupied,
}: {
  row: number;
  col: number;
  occupied: boolean;
}) {
  return <div className={`cell ${occupied ? "occupied" : "empty"}`}></div>;
}
