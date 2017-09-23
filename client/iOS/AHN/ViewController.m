//
//  ViewController.m
//  AHN
//
//  Created by LuF on 19/09/2017.
//  Copyright © 2017 LuF. All rights reserved.
//

#import "ViewController.h"
#import <WeexSDK/WXSDKInstance.h>

@interface ViewController ()

@property (nonatomic, strong) WXSDKInstance *instance;
@property (nonatomic, strong) UIView *weexView;
@property (nonatomic, assign) CGFloat weexHeight;
@property (nonatomic) NSInteger count;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.view setClipsToBounds:YES];
//    [[self navigationController] setNavigationBarHidden:YES];
    
    self.view.backgroundColor = [UIColor whiteColor];
    
    NSString *bundleUrl = [NSString stringWithFormat:@"file://%@/index.js",[NSBundle mainBundle].bundlePath];
    
    self.url = [NSURL URLWithString:bundleUrl];
   
    [self render];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)render {
    [_instance destroyInstance];
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = CGRectMake(0, 0, self.view.frame.size.width, self.view.frame.size.height - 64);
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
    };
    _instance.onFailed = ^(NSError *error) {
        //process failure
    };
    _instance.renderFinish = ^ (UIView *view) {
        //process renderFinish
    };
    
    NSURL *URL = [NSURL URLWithString: [self.url absoluteString]];
    NSString *randomURL = [NSString stringWithFormat:@"%@%@random=%d",URL.absoluteString,URL.query?@"&":@"?",arc4random()];
    [_instance renderWithURL:[NSURL URLWithString:randomURL] options:@{@"bundleUrl":URL.absoluteString} data:nil];
}

@end
