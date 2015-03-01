namespace angular_precompiled_templates.Modules
{
    using Nancy;

    public class IndexModule : NancyModule
    {
        public IndexModule()
        {
            Get["/"] = _ => View["index"];
            Get["/Data"] = _ => Response.AsJson(new { Value = "Test" });
        }
    }
}