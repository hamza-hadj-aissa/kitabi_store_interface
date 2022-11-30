import { Component } from "react";

class Categories extends Component {
    render() {
        return (
            <select>
                {this.props.categories.map((categorie) => {
                    return (
                        <option value={categorie.name}>{categorie.name}</option>
                    );
                })}
            </select>
        );
    }
}

export default Categories;
