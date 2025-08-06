export class Attempt {
  public entry: string = '';
  public parentId: string = '';

  public static noParentId(entry: string): Attempt {
    const cls = new Attempt();
    cls.entry = entry;
    return cls;
  }

  public static withParentId(entry: string, parentId: string): Attempt {
    const cls = new Attempt();
    cls.entry = entry;
    cls.parentId = parentId;
    return cls;
  }
}
