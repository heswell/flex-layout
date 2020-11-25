export function containerOf(layout, target) {
  if (target === layout) {
    return null;
  } else {
    let { idx, finalStep } = nextStep(layout.$path, target.$path);
    if (finalStep) {
      return layout;
    } else if (
      layout.children === undefined ||
      layout.children[idx] === undefined
    ) {
      return null;
    } else {
      return containerOf(layout.children[idx], target);
    }
  }
}

export function followPath(model, path) {
  if (path.indexOf(model.path) !== 0) {
    throw Error(
      `pathUtils.followPath path ${path} is not within model.path ${model.path}`
    );
  }

  var route = path.slice(model.path.length + 1);
  if (route === "") {
    return model;
  }
  var paths = route.split(".");

  for (var i = 0; i < paths.length; i++) {
    if (model.children === undefined) {
      console.log(
        `model at 0.${paths
          .slice(0, i)
          .join(
            "."
          )} has no children, so cannot fulfill rest of path ${paths
          .slice(i)
          .join(".")}`
      );
      return;
    }

    model = model.children[paths[i]];

    if (model === undefined) {
      console.log(
        `model at 0.${paths
          .slice(0, i)
          .join(
            "."
          )} has no children that fulfill next step of path ${paths
          .slice(i)
          .join(".")}`
      );
      return;
    }
  }
  return model;
}

export function nextStep(pathSoFar, targetPath) {
  if (pathSoFar === targetPath) {
    return { idx: -1, finalStep: true };
  }
  var regex = new RegExp(`^${pathSoFar}.`);
  // check that pathSoFar startsWith targetPath and if not, throw
  var paths = targetPath
    .replace(regex, "")
    .split(".")
    .map((n) => parseInt(n, 10));
  return { idx: paths[0], finalStep: paths.length === 1 };
}
