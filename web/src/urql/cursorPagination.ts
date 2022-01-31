import { FieldInfo, Resolver } from "@urql/exchange-graphcache";

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    // eg: entityKey - Query, fieldName - getSpendsByRange
    const { parentKey: entityKey, fieldName } = info;

    // allFields - return all query
    const allFields = cache.inspectFields(entityKey);

    // filter out the query we care about
    const fieldInfos: FieldInfo[] = allFields.filter(
      (info) => info.fieldName === fieldName
    );
    console.log("field info", fieldInfos);

    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const isInTheCache = cache.resolve(entityKey, fieldName, fieldArgs);
    console.log("in the cache", isInTheCache);

    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const data = cache.resolve(
        entityKey,
        fi.fieldName,
        fieldArgs
      ) as string[];
      // console.log(fi);
      // console.log("data: ", data);
      if (data) {
        results.push(...data);
      }
    });

    console.log("result: ", results);
    return results;

    // const visited = new Set();
    // let result: NullArray<string> = [];
    // let prevOffset: number | null = null;

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i];
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue;
    //   }

    //   const links = cache.resolve(entityKey, fieldKey) as string[];
    //   const currentOffset = args[cursorArgument];

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== "number"
    //   ) {
    //     continue;
    //   }

    //   const tempResult: NullArray<string> = [];

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j];
    //     if (visited.has(link)) continue;
    //     tempResult.push(link);
    //     visited.add(link);
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === "after")
    //   ) {
    //     result = [...result, ...tempResult];
    //   } else {
    //     result = [...tempResult, ...result];
    //   }

    //   prevOffset = currentOffset;
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    // if (hasCurrentPage) {
    //   return result;
    // } else if (!(info as any).store.schema) {
    //   return undefined;
    // } else {
    //   info.partial = true;
    //   return result;
    // }
  };
};
