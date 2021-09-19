export class Deployment {
  deploymentReason;
  deploymentDepartment;
  deploymentBranch;
  jobPosition;
  static toJson(model) {
    return {
      DeploymentReason: model.deploymentReason,
      DeploymentDepartment: model.deploymentDepartment,
      DeploymentBranch: model.deploymentBranch,
      jobPosition: model.jobPosition,
    };
  }
}
