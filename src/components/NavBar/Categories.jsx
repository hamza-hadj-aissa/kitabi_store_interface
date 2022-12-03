import { Component } from "react";

class Categories extends Component {
    render() {
        return (
            <select className="categories">
                {this.props.categories.map((categorie) => {
                    return (
                        <option key={categorie.name} value={categorie.name}>
                            {categorie.name}
                        </option>
                    );
                })}
            </select>
        );
    }
}

export default Categories;
