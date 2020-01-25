import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./category.model";
import { createCategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Category") private readonly CategoryModel: Model<Category>
  ) {}

  async createCategory(categoryDto: createCategoryDto) {
    let { name, description, imageUrl, parentId, order } = categoryDto;

    parentId = "Top" ? null : parentId;

    try {
      let [parent] = await this.CategoryModel.find({
        _id: parentId
      });
      let slug = parentId ? parent.slug : "Top";
      slug = slug + "_" + name;

      //create a new category and save in db
      let category = new this.CategoryModel({
        name,
        slug,
        description,
        parentId,
        order,
        imageUrl
      });

      let result = await category.save();

      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
