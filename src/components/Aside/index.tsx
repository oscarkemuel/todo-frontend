
export function Aside() {
    return (
        <aside >
            <div className="search">
                <p>Search your task</p>
                <form>
                    <div className="controls">
                        <input type="text" id="search_field"/>
                    </div>
                    <button className="submit-btn" id="search">SEARCH</button>
                </form>
            </div>
            <div className="tags">
                <h3>Tags</h3>
                <ul>
                    <li><p>Tag1</p></li>
                    <li><p>Tag2</p></li>
                    <li><p>Tag3</p></li>
                </ul>
            </div>
        </aside>
    )
}