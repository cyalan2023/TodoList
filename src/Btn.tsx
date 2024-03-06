type BtnProps = {
    title: string
    onClickHaandler?: ()=> void
}
export const Btn = ({title, onClickHaandler}:BtnProps) => {
    return (
        <button onClick={onClickHaandler}>{title}</button>
    )

}