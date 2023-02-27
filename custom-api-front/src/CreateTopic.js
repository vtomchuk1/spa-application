
function CreateTopic(){
    return (
        <div class='container'>
            <div className="create">
                <div className="create__head">
                    <div className="create__title"><img src="/fonts/icons/main/New_Topic.svg" alt="New topic"/>Створити нове повідомленя</div>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="title">Тема</label>
                    <input type="text" className="form-control" id="title" placeholder="Написати тут"/>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="create__section">
                            <label className="create__label" htmlFor="category">Select Category</label>
                            <label className="custom-select">
                                <select id="category">
                                    <option>Choose</option>
                                    <option>Choose #2</option>
                                    <option>Choose #3</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="create__section">
                            <label className="create__label" htmlFor="sub-category">Select Sub Category</label>
                            <label className="custom-select">
                                <select id="sub-category">
                                    <option>Choose</option>
                                    <option>Choose #2</option>
                                    <option>Choose #3</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="create__section create__textarea">
                    <label className="create__label" htmlFor="description">Description</label>
                    <div className="create__textarea-head">
                        <span><i className="icon-Quote"></i></span>
                        <span><i className="icon-Bold"></i></span>
                        <span><i className="icon-Italic"></i></span>
                        <div className="create__textarea-separate"></div>
                        <span><i className="icon-Share_Topic"></i></span>
                        <span><i className="icon-BlockQuote"></i></span>
                        <span><i className="icon-Performatted"></i></span>
                        <span><i className="icon-Upload_Files"></i></span>
                        <span className="create__textarea-separate"></span>
                        <span><i className="icon-Bullet_List"></i></span>
                        <span><i className="icon-heading"></i></span>
                        <span><i className="icon-Horizontal_Line"></i></span>
                        <span><i className="icon-Emoticon"></i></span>
                        <span><i className="icon-Settings"></i></span>
                        <span><i className="icon-Color_Picker"></i></span>
                        <div className="create__textarea-btn">
                            <a href="#" className="btn">Preview</a>
                        </div>
                    </div>
                    <textarea className="form-control" id="description">Adding amazing books to your summer reading list can be as simple as signing up for the BuzzFeed Books newsletter! You'll get a review of a new book you might love every Wednesday, plus much more twice a week: great jokes and quizzes, wonderful lists, powerful essays, all the Harry Potter and YA buzz you can handle, and of course, even more book recommendations. So make some space in your beach bag now — because you're going to have a lot to read this summer.</textarea>
                </div>
                <div className="create__section">
                    <label className="create__label" htmlFor="tags">Add Tags</label>
                    <input type="text" className="form-control" id="tags" placeholder="e.g. nature, science"/>
                </div>
                <div className="create__advanced">
                    <div className="row">
                        <div className="col-lg-4 col-xl-4">
                            <div className="create__section">
                                <label className="create__label">Who can see this?</label>
                                <div className="create__radio">
                                    <label className="create__box">
                                        <label className="custom-radio">
                                            <input type="radio" name="can-see" checked="checked"/>
                                                <i></i>
                                        </label>
                                        <span>Everyone</span>
                                    </label>
                                    <label className="create__box">
                                        <label className="custom-radio">
                                            <input type="radio" name="can-see"/>
                                                <i></i>
                                        </label>
                                        <span>Only Friends</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="create__section">
                                <label className="create__label">Share on Social?</label>
                                <div className="create__radio">
                                    <label className="create__box">
                                        <label className="custom-checkbox">
                                            <input type="checkbox" name="share-social" checked="checked"/>
                                                <i></i>
                                        </label>
                                        <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                    </label>
                                    <label className="create__box">
                                        <label className="custom-checkbox">
                                            <input type="checkbox" name="share-social" checked="checked"/>
                                                <i></i>
                                        </label>
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </label>
                                    <label className="create__box">
                                        <label className="custom-checkbox">
                                            <input type="checkbox" name="share-social"/>
                                                <i></i>
                                        </label>
                                        <i className="fa fa-google-plus" aria-hidden="true"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-5">
                            <div className="create__section">
                                <label className="create__label">Is this a Mature Thread?</label>
                                <div className="create__radio">
                                    <label className="create__box">
                                        <label className="custom-radio">
                                            <input type="radio" name="mature-thread"/>
                                                <i></i>
                                        </label>
                                        <span>Yes</span>
                                    </label>
                                    <label className="create__box">
                                        <label className="custom-radio">
                                            <input type="radio" name="mature-thread" checked="checked"/>
                                                <i></i>
                                        </label>
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create__footer">
                    <a href="#" className="create__btn-cansel btn">Cancel</a>
                    <a href="#" className="create__btn-create btn btn--type-02">Create Thread</a>
                </div>
            </div>
        </div>
    );
}

export default CreateTopic;