// MS Teams Active card for CI/CD information message
// This is json for AZURE power automate flow see 2023-10-13_01-41.png
const card = {
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "ColumnSet",
      "columns": [
        {
          "type": "Column",
          "items": [
            {
              "type": "Image",
              "style": "person",
              "url": "https://www.fintail.me/icons/AWS-CodePipeline.png",
              "size": "small"
            }
          ],
          "width": "auto"
        },
        {
          "type": "Column",
          "items": [
            {
              "type": "TextBlock",
              "weight": "bolder",
              "size": "medium",
              "text": "AWS pipeline deployment"
            },
            {
              "type": "TextBlock",
              "weight": "lighter",
              "size": "Small",
              "text": "@{formatDateTime(parseDateTime(body('Parse_JSON_2')?['time']), 'yyyy-MM-dd HH:mm:ss', 'en-US')}; @{split(Coalesce(body('Parse_JSON_2')?['detail']?['execution-trigger']?['trigger-detail'],'/'), '/')[1]}"
            },
            {
              "type": "ColumnSet",
              "separator": true,
              "columns": [
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "size": "Medium",
                      "text": "@{body('Parse_JSON_2')?['detail']?['pipeline']}"
                    }
                  ]
                },
                {
                  "type": "Column",
                  "items": [
                    {
                      "type": "TextBlock",
                      "size": "Medium",
                      "weight": "Bolder",
                      "color": "@{if(equals(body('Parse_JSON_2')?['detail']?['state'], 'SUCCEEDED'), 'Good', '')} @{if(equals(body('Parse_JSON_2')?['detail']?['state'], 'Failed'), 'Attention', '')} ",
                      "text": "@{toLower(body('Parse_JSON_2')?['detail']?['state'])}"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.OpenUrl",
      "title": "View",
      "url": "https://us-east-2.console.aws.amazon.com/codesuite/codepipeline/pipelines/@{body('Parse_JSON_2')?['detail']?['pipeline']}/executions/@{body('Parse_JSON_2')?['detail']?['execution-id']}/timeline"
    }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.4"
}