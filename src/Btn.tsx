type BtnProps = {
    title: string
    onClickHaandler?: ()=> void
    isDisabled?: boolean
}
export const Btn = ({title, onClickHaandler,isDisabled}:BtnProps) => {
    return (
        <button  disabled={isDisabled}  onClick={onClickHaandler}>{title}</button>
    )

}