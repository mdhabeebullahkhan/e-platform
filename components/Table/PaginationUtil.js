
export const Pagination = ({ page, totalCount, pageIndex, pageSize, previousPage, nextPage, setPageSize, gotoPage }) => {
    return (
        <div className="row justify-content-center">
            <div>
                {<PrevNextButtons page={page} pageIndex={pageIndex} pageSize={pageSize} previousPage={previousPage} nextPage={nextPage} />}
            </div>
            {totalCount && (
                <>
                    <div className="ml-2">
                        {<PageSelector totalCount={totalCount} pageIndex={pageIndex} pageSize={pageSize} gotoPage={gotoPage} />}
                    </div>
                    <div className="ml-2">
                        {<DisplayRows pageSize={pageSize} setPageSize={setPageSize} />}
                    </div>

                </>
            )
            }
        </div>
    );
}
export const PrevNextButtons = ({ page, pageIndex, pageSize, previousPage, nextPage }) => {
    return (
        <>
            <button className="round" onClick={() => previousPage()} disabled={pageIndex === 0}>
                {'<'}
            </button>
            <button className="round ml-2" onClick={() => nextPage()} disabled={page.length < pageSize}>
                {'>'}
            </button>
        </>
    );
}
export const PageSelector = ({ totalCount, pageIndex, pageSize, gotoPage }) => {
    var optionArr = [];
    const pagesLength = totalCount ? Math.ceil(totalCount / pageSize) : 0;
    for (var i = 0; i < pagesLength; i++) {
        optionArr.push(i + 1);
    }

    return (
        <>

            <select
                type="number"
                value={pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                }}

            >
                {optionArr && optionArr.map(option => (
                    <option key={option} value={option}>{'Page ' + option}</option>
                ))}
            </select>
        </>
    );
}

export const DisplayRows = ({ pageSize, setPageSize }) => {
    return (
        <>
            <label className="text-secondary mr-1">Rows per page</label>
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value));
                }}
            >
                {[10, 20, 30, 50, 70, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>{pageSize}</option>
                ))}
            </select>
        </>
    );
}