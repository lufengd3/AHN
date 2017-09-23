//
//  WXEventModule.m
//  AHN
//
//  Created by LuF on 23/09/2017.
//  Copyright © 2017 LuF. All rights reserved.
//

#import "WXEventModule.h"
#import <WeexSDK/WXBaseViewController.h>

@implementation WXEventModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(openURL:))

- (void)openURL:(NSString *)url
{
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        // relative path
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }
    
    NSLog(@"open url %@", url);
}

@end

