import { Injectable, NotFoundException } from '@nestjs/common';
import readXlsxFile from 'read-excel-file/node';
import { CreateAppartmentDto } from '../dtos/appartment.dto';
import { CreateBuildingDto } from '../dtos/building.dto';
import { CreateProjectDto } from '../dtos/project.dto';
import { Appartment } from '../entities/appartment.entity';
import { Building } from '../entities/building.entity';
import { Project } from '../entities/project.entity';
import { AppartmentService } from './appartment.service';
import { BuildingService } from './building.service';
import { ProjectService } from './project.service';

@Injectable()
export class BulkService {
  constructor(
    private projectService: ProjectService,
    private buildingService: BuildingService,
    private appartmentService: AppartmentService,
  ) {}
  async bulkInitialData(file: Express.Multer.File) {
    let project: Project = new Project();
    let building: Building = new Building();
    let appartment: Appartment = new Appartment();

    await readXlsxFile(file['path']).then(async (rows) => {
      for (let index = 0; index < rows.length; index++) {
        const currentProjectName = project.name || '';
        const currentBuildingName = project.name || '';
        const currentApprtmentConstructionName =
          appartment.constructionName || '';

        if (index !== 0) {
          try {
            const data = rows[index];
            const projectName = data[0] as string;
            const projectAddress = data[1] as string;
            const buildingName = data[2] as string;
            const buildingFloors = data[3] as number;
            const buildingNumberAppartments = data[4] as number;
            const apprtmentConstructionName = data[5] as string;

            if (
              projectName.toUpperCase() !== currentProjectName.toUpperCase()
            ) {
              project = await this.handleProject(projectName, projectAddress);
            }

            if (
              currentBuildingName.toUpperCase() !== buildingName.toUpperCase()
            ) {
              building = await this.handleBuilding(
                projectName,
                buildingFloors,
                buildingNumberAppartments,
                project,
              );
            }

            if (
              currentApprtmentConstructionName !== apprtmentConstructionName
            ) {
              appartment = await this.handleAppartment(
                apprtmentConstructionName,
                building,
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  }

  async handleProject(
    projectName: string,
    projectAddress: string,
  ): Promise<Project> {
    let project: Project = null;

    if (!projectName) {
      throw new Error(`Project name not valid.`);
    }

    project = await this.projectService.findByName(projectName.toUpperCase());

    if (!project) {
      const newProject = new CreateProjectDto(projectName, projectAddress);
      project = await this.projectService.create(newProject);
    }

    if (!project) {
      throw new Error(`Problems to create a new project.`);
    }

    return project;
  }

  async handleBuilding(
    buildingName: string,
    buildingFloors: number,
    buildingNumberAppartments: number,
    project: Project,
  ) {
    let building: Building = null;

    if (!buildingName) {
      throw new Error(`Building name not valid.`);
    }

    building = await this.buildingService.findByName(buildingName);

    if (!building) {
      const newBuilding = new CreateBuildingDto();
      newBuilding.name = buildingName;
      newBuilding.numberOfFloors = buildingFloors;
      newBuilding.numberOfAppartments = buildingNumberAppartments;
      newBuilding.projectId = project.id;

      building = await this.buildingService.create(newBuilding);
    }

    if (!building) {
      throw new Error(`Problems to create a new building.`);
    }

    return building;
  }

  async handleAppartment(
    apprtmentConstructionName: string,
    building: Building,
  ) {
    let appartment: Appartment = null;

    if (!apprtmentConstructionName) {
      throw new Error(`Appartment name not valid.`);
    }

    appartment = await this.appartmentService.findByConstructionName(
      apprtmentConstructionName,
    );

    if (!appartment) {
      const newAppartment = new CreateAppartmentDto();
      newAppartment.constructionName = apprtmentConstructionName;
      newAppartment.buildingId = building.id;

      appartment = await this.appartmentService.create(newAppartment);
    }

    if (!appartment) {
      throw new Error(`Problems to create a new appartment.`);
    }

    return appartment;
  }
}
