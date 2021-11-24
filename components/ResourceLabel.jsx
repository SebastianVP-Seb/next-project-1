

function ResourceLabel({resource}) {

    console.log(resource);

    return (
        <div className="field is-grouped is-grouped-multiline div-tag">
            <div className="control">
                <div className="tags has-addons">
                    <span className="tag is-dark">Status</span>
                    {/* <div className={`tag resource-${resource.status}`}> */}
                        <span className={`tag is-link is-light resource-${resource.status}`}>{resource.status}</span>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default ResourceLabel;
